import React, { useState, useEffect } from "react"
import { reduce } from "lodash/fp"
import Benchmark from "./Benchmark"
import useBenchmarks from './useBenchmarks'
import { BenchmarkRecord } from "./BenchmarkContext"

const BenchmarkPanel = () => {
  const {benchmarks, updateBenchmarkById, clearAll, clearBenchmarkById, forceRerender} = useBenchmarks();
  const [showBenchmarks, setShowBenchmarks] = useState<boolean>(false)
  const [showRequest, setShowRequest] = useState(true)
  const [showParse, setShowParse] = useState(true)
  const [showTransform, setShowTransform] = useState(true)
  const [showRender, setShowRender] = useState(true)

  useEffect(() => {
    if (window.location.href.includes('#benchmarks')) {
      setShowBenchmarks(true)
    }
  }, [])

  const calculateTotal = (b: BenchmarkRecord) =>
    (showRequest ? b.request : 0)
    + (showParse ? b.parse: 0)
    + (showTransform ? b.transform: 0)
    + (showRender ? b.render: 0);

  const max = reduce((max: number, ex: BenchmarkRecord) => {
    if (!ex) return max
    const total = calculateTotal(ex)
    return total > max ? total : max
  }, 0)(Object.values(benchmarks))

  return (
    <React.Fragment>
      <aside className={showBenchmarks ? "" : "hidden"}>
        <header className={"header"}>
          <button onClick={forceRerender}>Run</button>
          <button onClick={clearAll}>Clear</button>

          <button
            className={`toggle render ${showRender && "active"}`}
            onClick={() => setShowRender(!showRender)}
          >
            Render
          </button>
          <button
            className={`toggle transform ${showTransform && "active"}`}
            onClick={() => setShowTransform(!showTransform)}
          >
            Transform
          </button>
          <button
            className={`toggle parse ${showParse && "active"}`}
            onClick={() => setShowParse(!showParse)}
          >
            Parse
          </button>
          <button
            className={`toggle request ${showRequest && "active"}`}
            onClick={() => setShowRequest(!showRequest)}
          >
            Request
          </button>
        </header>
        <article className="benchmark benchmark--header">
          <header>
            <label>Name</label>
            {showRequest && <label>Fetch</label>}
            {showParse && <label>Parse</label>}
            {showTransform && <label>Transform</label>}
            {showRender && <label>Render</label>}
            <label>Total</label>
            <label />
          </header>
        </article>
        {benchmarks &&
          Object.keys(benchmarks)
            .reverse()
            .map(key => {
              const benchmark = benchmarks[key]
              return (
                <Benchmark
                  key={key}
                  {...benchmark}
                  total={calculateTotal(benchmark)}
                  onClear={() => clearBenchmarkById(key)}
                  onUpdateTitle={(title) => updateBenchmarkById(key, { title })}
                  max={max}
                  showRequest={showRequest}
                  showTransform={showTransform}
                  showParse={showParse}
                  showRender={showRender}
                />
              )
            })}
      </aside>
    </React.Fragment>
  )
}

export default BenchmarkPanel