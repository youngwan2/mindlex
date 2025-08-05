import { toast } from 'react-hot-toast';
import { HiStar, HiExclamationCircle } from 'react-icons/hi';
import { ReactNode } from 'react';

function ToastIcon({ icon }: { icon: ReactNode }) {
    return <span style={{ display: 'flex', alignItems: 'center', fontSize: 20 }}>{icon}</span>;
}

export function showSuccessToast(message?: string) {
    toast.custom((t) => (
        <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full shadow bg-yellow-50 border border-yellow-200 text-yellow-600 ${t.visible ? 'animate-enter' : 'animate-leave'}`}
            style={{ minWidth: 220 }}
        >
            <ToastIcon icon={<HiStar style={{ color: '#ffb900' }} />} />
            {message || '북마크가 성공적으로 추가되었습니다.'}
        </div>
    ), { duration: 2000 });
}

export function showErrorToast(message?: string) {
    toast.custom((t) => (
        <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full shadow  border border-red-100 text-red-600 ${t.visible ? 'animate-enter' : 'animate-leave'}`}
            style={{ minWidth: 220 }}
        >
            <ToastIcon icon={<HiExclamationCircle style={{ color: '#e11d48' }} />} />
            {message || '북마크 처리 중 오류가 발생했습니다.'}
        </div>
    ), { duration: 2500 });
}
