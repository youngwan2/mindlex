export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="w-full border-t bg-gray-100 py-4 text-center">
            <p>© {currentYear} 마인드렉스. 모든 권한 보유.</p>
        </footer>
    )
}