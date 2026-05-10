const Stripe = require("stripe");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function run() {
  const rows = [];

  for await (const charge of stripe.charges.list({ limit: 100 })) {
    rows.push({
      id: charge.id,
      created: new Date(charge.created * 1000).toISOString(),
      amount: charge.amount / 100,
      currency: charge.currency,
      email: charge.billing_details?.email || "",
      billing_country: charge.billing_details?.address?.country || "",
      card_country: charge.payment_method_details?.card?.country || "",
    });

    console.log(`Fetched ${rows.length}`);
  }

  const csvWriter = createCsvWriter({
    path: "stripe-export.csv",
    header: [
      { id: "id", title: "ID" },
      { id: "created", title: "Created" },
      { id: "amount", title: "Amount" },
      { id: "currency", title: "Currency" },
      { id: "email", title: "Email" },
      { id: "billing_country", title: "Billing Country" },
      { id: "card_country", title: "Card Country" },
    ],
  });

  await csvWriter.writeRecords(rows);

  console.log("Export complete.");
}

run();
