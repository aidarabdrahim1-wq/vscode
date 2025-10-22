import Chat from '../components/Chat'
import Profile from '../components/Profile'
import Progress from '../components/Progress'

export default function Dashboard() {
  return (
    <div className="grid">
      <div className="card"><Profile /></div>
      <div className="card"><Chat /></div>
      <div className="card"><Progress /></div>
    </div>
  )
}
