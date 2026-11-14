import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function QuoteModal({ isOpen, onClose, post }) {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Quote</DialogTitle>
                </DialogHeader>

                <Textarea
                    placeholder="What's happening?"
                    className="min-h-[120px] resize-none border-0 shadow-none focus-visible:ring-0"
                />

                {/* Original Post */}
                <div className="rounded-xl border p-4">
                    <div className="mb-2 flex items-center gap-2">
                        <img
                            src="https://i.pravatar.cc/150?img=12"
                            alt="Avatar"
                            className="h-8 w-8 rounded-full object-cover"
                        />

                        <span className="font-semibold">hungomega</span>
                        <span className="text-sm text-gray-500">2h</span>
                    </div>

                    <p className="text-sm leading-6">{post.content}</p>
                </div>

                <div className="flex justify-end">
                    <Button className="rounded-full">Post</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default QuoteModal;
