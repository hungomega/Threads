import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function BlockModal({ isOpen, onClose, onConfirm }) {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>Block user?</DialogTitle>
                </DialogHeader>

                <p className="text-sm text-gray-500">
                    They won't be able to find your profile or see your posts.
                </p>

                <div className="flex justify-end gap-3">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="rounded-full"
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={onConfirm}
                        className="rounded-full bg-red-600 text-white hover:bg-red-700"
                    >
                        Block
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default BlockModal;
