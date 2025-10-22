export default function Topics() {
  const topics = ['Математика', 'Қазақ тілі', 'Қазақстан тарихы', 'Оқу сауаттылығы']
  return (
    <ul>
      {topics.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  )
}
