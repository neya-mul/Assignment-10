import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';

export async function POST(req) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    const body = await req.json();
    // ফ্রন্টএন্ড থেকে পাঠানো ইউজারের ডেটা রিসিভ করা হলো
    const { classId, className, price, userEmail, userName } = body;

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

    return NextResponse.json({ url: session.url })
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Internal payment setup breakdown" },
      { status: err.statusCode || 500 }
    )
  }
}