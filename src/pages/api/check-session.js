// pages/api/check-session.js
export default async function handler(req, res) {
  // Implement your session validation logic here
  // For example:
  const session = await req.cookies.userData; // or whatever your session cookie is named

  if (session) { // Replace with actual session validation
    res.status(200).json({ status: 'active' });
  } else {
    res.status(401).json({ status: 'expired' });
  }
}
