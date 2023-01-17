import Header from '../../components/header'


export default function PostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <div className="container mx-auto my-20 w-7/12">
        {children}
        </div>
  )
}
