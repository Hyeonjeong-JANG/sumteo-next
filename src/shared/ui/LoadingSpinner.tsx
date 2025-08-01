export function LoadingSpinner({ text = "저장 중..." }: { text?: string }) {
    return (
        <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white/80 border-t-transparent rounded-full animate-spin"></div>
            <span>{text}</span>
        </div>
    );
}