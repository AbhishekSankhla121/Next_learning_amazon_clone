import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// This function handles the POST request from your frontend
export async function POST(req: NextRequest) {
  try {
    // Extract the raw text from the request body
    const temp = await req.text();
    // Parse the raw body into key-value pairs
    const body = parseRequestBody(temp);
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = body;

    // Generate HMAC-SHA256 signature using the Razorpay secret key
    const generated_signature = crypto
      .createHmac("sha256", process.env.NEXT_PUBLIC_RAZORPAY_SECRET_KEY!)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    // Check if the generated signature matches the received signature
    const isAuthentic = generated_signature === razorpay_signature;
    if (isAuthentic) {
      console.log("Payment signature verified");
      // Perform further actions for successful payment verification
    } else {
      console.log("Payment signature verification failed");
      // Handle failed payment verification
    }

    // Respond with a JSON object indicating success and returning the parsed body data
    return NextResponse.json({
      success: true,
      data: body,
    });
  } catch (error) {
    // Catch any errors that occur during processing
    console.error("Error:", error);
    // Respond with a JSON object indicating failure and returning the error message
    return NextResponse.json({ success: false, error: error });
  }
}

// Helper function to parse the raw request body into key-value pairs
function parseRequestBody(body: string): Record<string, string> {
  // Split the body into key-value pairs
  const keyValuePairs = body.split("&").map((pair) => pair.split("="));
  // Initialize an empty object to store the parsed data
  const parsedBody: Record<string, string> = {};

  // Iterate through each key-value pair and populate the parsedBody object
  keyValuePairs.forEach(([key, value]) => {
    parsedBody[key] = value;
  });

  // Return the parsed body data
  return parsedBody;
}
