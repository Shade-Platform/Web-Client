export async function verifyToken(): Promise<boolean> {
  const token = localStorage.getItem('token')
  if (!token) return false

  try {
    const res = await fetch("http://localhost:8080/auth/me/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return res.ok // true if valid, false if not
  } catch (err) {
    return false
  }
}
