
import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_EMAIL || "nuvobix@gmail.com";
    const from =
      process.env.EMAIL_FROM || "Nuvobix <onboarding@resend.dev>";

    if (!apiKey || apiKey === "your_actual_resend_api_key") {
      return NextResponse.json(
        {
          success: false,
          message: "Resend API key missing. Check your .env.local file.",
        },
        { status: 500 }
      );
    }

    const body = await request.json();

    const name =
      typeof body.name === "string" ? body.name.trim() : "";
    const email =
      typeof body.email === "string" ? body.email.trim() : "";
    const service =
      typeof body.service === "string" ? body.service.trim() : "";
    const message =
      typeof body.message === "string" ? body.message.trim() : "";

    if (
      !name ||
      !email ||
      !service ||
      !message ||
      name.length > 100 ||
      email.length > 254 ||
      service.length > 100 ||
      message.length > 5000
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all fields correctly.",
        },
        { status: 400 }
      );
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!validEmail.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `New Nuvobix Inquiry: ${service}`,
      text: [
        "New project inquiry from the Nuvobix website",
        "",
        `Name: ${name}`,
        `Client Email: ${email}`,
        `Service: ${service}`,
        "",
        "Project Details:",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully!",
      id: data?.id,
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}
