type LoaderProps = {
  label?: string
}

export default function Loader({ label = 'Загрузка...' }: LoaderProps) {
  return <div>{label}</div>
}