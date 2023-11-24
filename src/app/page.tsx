import Image from 'next/image'
import WordClockGrid from '../components/WordClockGrid';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div> 
          <p className="text-4xl font-bold text-center">ZA TIME</p>
          <WordClockGrid />
      </div>
    </main>
  )
}

