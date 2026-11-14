import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function ReportModal({ isOpen, onClose, onSubmit }) {
    const [reason, setReason] = useState("");

    const handleSubmit = () => {
        if (!reason) return;

        onSubmit({ reason });
    };

    const handleClose = () => {
        setReason("");
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="sm:max-w-[450px]">
                <DialogHeader>
                    <DialogTitle>Report post</DialogTitle>
                </DialogHeader>

                <p className="text-sm text-gray-500">
                    Why are you reporting this post?
                </p>

                <RadioGroup
                    value={reason}
                    onValueChange={setReason}
                    className="space-y-3"
                >
                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="spam" id="spam" />
                        <label htmlFor="spam">Spam</label>
                    </div>

                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="harassment" id="harassment" />
                        <label htmlFor="harassment">Harassment</label>
                    </div>

                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="hate_speech" id="hate_speech" />
                        <label htmlFor="hate_speech">Hate speech</label>
                    </div>

                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="violence" id="violence" />
                        <label htmlFor="violence">Violence</label>
                    </div>

                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="other" id="other" />
                        <label htmlFor="other">Other</label>
                    </div>
                </RadioGroup>

                <div className="flex justify-end gap-3">
                    <Button
                        variant="outline"
                        onClick={handleClose}
                        className="rounded-full"
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleSubmit}
                        disabled={!reason}
                        className="rounded-full bg-red-600 text-white hover:bg-red-700"
                    >
                        Submit Report
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ReportModal;
