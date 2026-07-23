import Map from '@/components/Map'

export default function DevMapPage() {
  return (
    <main className="flex-1 p-8">
      <h1 className="text-2xl font-semibold text-foreground">Map</h1>
      <div className="mt-6">
        <Map />
      </div>
    </main>
  )
}
