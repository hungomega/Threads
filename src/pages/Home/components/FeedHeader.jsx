function FeedHeader() {
    return (
        <header className="border-b border-gray-200">
            <h1 className="py-5 text-center text-xl font-bold">Trang chủ</h1>

            <div className="flex">
                <button className="flex-1 border-b-2 border-black py-4 font-semibold">
                    Dành cho bạn
                </button>

                <button className="flex-1 py-4 text-gray-500 hover:bg-gray-50">
                    Đang theo dõi
                </button>
            </div>
        </header>
    );
}

export default FeedHeader;
