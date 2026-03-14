export default function DeviceInfoLoading() {
    return (
        <div className="max-w-[840px] mx-auto px-5 py-8 md:py-12 animate-pulse">
            <div className="h-4 w-32 bg-[var(--color-surface-3)] rounded mb-6"></div>
            
            <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                <div>
                    <div className="h-8 w-64 bg-[var(--color-surface-3)] rounded mb-2"></div>
                </div>
            </div>

            <div className="card p-6 mb-8 border-[var(--color-border)] bg-[var(--color-surface)]">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-surface-3)]"></div>
                    <div>
                        <div className="h-5 w-40 bg-[var(--color-surface-3)] rounded mb-2"></div>
                        <div className="h-4 w-24 bg-[var(--color-surface-3)] rounded"></div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="card p-5 bg-[var(--color-surface-2)] border-[var(--color-border)]">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-lg bg-[var(--color-surface-3)] shrink-0"></div>
                            <div className="flex-1">
                                <div className="h-4 w-24 bg-[var(--color-surface-3)] rounded mb-2"></div>
                                <div className="h-5 w-32 bg-[var(--color-surface-3)] rounded"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
