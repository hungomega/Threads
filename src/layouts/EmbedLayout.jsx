function EmbedLayout({ children }) {
    return (
        // Layout dành riêng cho nội dung nhúng iframe
        <main className="min-h-screen w-full bg-white">{children}</main>
    );
}

export default EmbedLayout;
