export async function GET(): Promise<Response> {
  return Response.json({
    message: "API route ready. Connect research software API here.",
  });
}
