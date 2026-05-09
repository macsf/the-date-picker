interface WeekNumbersProps {
  weekNumbers: number[]
}

export function WeekNumbers({ weekNumbers }: WeekNumbersProps) {
  return (
    <div className="dp-week-numbers" aria-hidden="true">
      <div className="dp-week-number-header">W</div>
      {weekNumbers.map((wn, i) => (
        <div key={i} className="dp-week-number">
          {wn}
        </div>
      ))}
    </div>
  )
}
