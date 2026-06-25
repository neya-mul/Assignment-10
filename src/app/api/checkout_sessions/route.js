import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';

export async function POST(req) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    const body = await req.json();
    const { classId, className, trainerName, trainerId, price, scheduleTime, userEmail, userName } = body;
    const data = {
      classId,
      className,
      scheduleTime,
      trainerName,
      trainerId,
      price,
      userEmail,
      userName,

    }
    // console.log(data);


    if (!price) {
      return NextResponse.json({ error: 'Price is required.' }, { status: 400 })
    }

    let customer;
    if (userEmail) {
      customer = await stripe.customers.create({
        email: userEmail,
        name: userName || undefined,
      });
    }

    const amountInCents = Math.round(price * 100);

    const session = await stripe.checkout.sessions.create({
      customer: customer?.id,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: className,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/classes/${classId}`,
      metadata: {
        classId: classId,
        buyerName: userName || "Anonymous",
        buyerEmail: userEmail || "No Email"
      }
    });
    console.log(session, 'from session', data);



    if (session.url) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}my-booked-classes`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      res.json()
    }


    return NextResponse.json({ url: session.url })
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Internal payment setup breakdown" },
      { status: err.statusCode || 500 }
    )
  }
}