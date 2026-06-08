import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { NavbarOption } from "@/components/ui/NavbarOption";
import { HelpCircle } from "lucide-react";
import { Info } from "lucide-react";
import { useLocation } from "react-router-dom";
import { SUPPORT_CONTENT } from "@/config/supportContent";

function SupportDialog() {
  const location = useLocation();
  const content = SUPPORT_CONTENT[location.pathname] || "Need help? Contact our support team for assistance.";  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <NavbarOption
          label="Support"
          icon={<HelpCircle className="size-5" strokeWidth={1.75} />}
        />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Info className="size-5 mr-2 inline-block" strokeWidth={1.75} />
            Support
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          {content}
        </p>
      </DialogContent>
    </Dialog>
  );
}

export { SupportDialog };
