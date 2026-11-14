import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

function DeleteModal({ isOpen, onClose, onConfirm }) {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>Delete post?</DialogTitle>
                </DialogHeader>

                <p className="text-sm text-gray-500">
                    Are you sure you want to delete this post? This action
                    cannot be undone.
                </p>

                <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>

                    <Button
                        className="bg-red-600 text-white hover:bg-red-700"
                        onClick={onConfirm}
                    >
                        Delete
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default DeleteModal;
