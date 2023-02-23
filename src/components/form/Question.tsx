export default function Question(props: { question: string, stepCount: number, stepCountCheck: number, small?: string }) {
    return (
        <p className={`text-left my-4 duration-150 pr-10 transition-all ${props.stepCount > props.stepCountCheck ? 'text-sm text-muted' : 'text-lg leading-5 font-bold'}`}>
            {props.question} {props.small && props.small.length > 0 && <span className="text-xs text-muted">({props.small})</span>}
        </p>
    )
}