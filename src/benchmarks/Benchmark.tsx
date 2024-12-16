type BenchmarkProps = {
  // metadata
  id: string,
  title: string,

  // rendering helpers
  showRequest?: boolean,
  showTransform?: boolean,
  showParse?: boolean,

  // data
  parse: number,
  request: number,
  transform: number,
  total: number,
  max?: number

  // hooks
  onClear: (idToClear: string) => void,
  onUpdateTitle: (newTitle: string) => void
}

const Benchmark = ({
  id,
  title,
  showRequest = true,
  showParse = true,
  showTransform = true,
  parse = 0,
  request = 0,
  transform = 0,
  total = 0,
  onClear,
  onUpdateTitle,
  max = 10000
}: BenchmarkProps) => {
  return (
    <article className="benchmark">
      <header>
        <input
          value={title}
          name={`experiment-${id}-title`}
          onChange={e => onUpdateTitle(e.target.value)}
          // onClick={e => e.target.select()}
        />
        {showRequest && (
          <label className={"label label--request"}>
            <i /> {request}ms
          </label>
        )}
        {showParse && (
          <label className={"label label--parse"}>
            <i /> {parse}ms
          </label>
        )}
        {showTransform && (
          <label className={"label label--transform"}>
            <i /> {transform}ms
          </label>
        )}
        <label className={"label label--total"}>
          <i /> {total}ms ({Math.round((total / max) * 100)}%)
        </label>
        <button onClick={() => onClear(id)}>Clear</button>
      </header>
      <div className="benchmark__runner">
        {showRequest && (
          <div
            className="benchmark__progress benchmark__progress--request"
            style={{ width: (request / max) * 100 + "%" }}
          />
        )}
        {showParse && (
          <div
            className="benchmark__progress benchmark__progress--parse"
            style={{ width: (parse / max) * 100 + "%" }}
          />
        )}
        {showTransform && (
          <div
            className="benchmark__progress benchmark__progress--transform"
            style={{ width: (transform / max) * 100 + "%" }}
          />
        )}
      </div>
    </article>
  )
}

export default Benchmark