import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  revalidated: boolean
}
type Msg = {
  message: string
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Msg>
) {
  console.log('Revalidating notes pages...')
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Your secret is invalid!' })
  }
  let revalidated = false
  try {
    await res.revalidate('/notes')
    revalidated = true
  } catch (e) {
    console.log(e)
  }
  res.json({
    revalidated,
  })
}
