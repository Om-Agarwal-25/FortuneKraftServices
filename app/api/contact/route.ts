export async function POST(): Promise<Response> {
  return Response.json({
    message: "Contact API route ready. Connect Resend here.",
  });
}
