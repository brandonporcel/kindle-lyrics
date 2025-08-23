"use client";
import { useState } from "react";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import Form from "@/components/form";
import PdfPresentation from "../pdf-presentation";
import { getPDFTemplate, sendAlbumEmail } from "@/actions";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import SelectedResult from "../selected-result";
import { SearchSuggestion } from "@/types";

export default function FormAction() {
  const [scrapingResult, setScrapingResult] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [selectedResult, setSelectedResult] = useState<SearchSuggestion | null>(
    null
  );
  const [status, setStatus] = useState<"to-search" | "pdf-preview">(
    "to-search"
  );
  const [isSendingPdf, setIsSendingPdf] = useState<boolean>(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);

  const handlePdfGeneration = async (albumId: string) => {
    try {
      setIsGeneratingPdf(true);
      setStatus("pdf-preview");
      const res = await getPDFTemplate({ albumId });
      setScrapingResult(res);
    } catch (error) {
      toast.error(
        "An error ocurred while trying to get lyrics. Please try later"
      );
      console.error("Error generating PDF:", error);
    } finally {
      setStatus("to-search");
      setIsGeneratingPdf(false);
    }
  };

  const handleSendedAlbum = () => {
    toast.success("Pdf with lyrics sent correctly!", {
      position: "top-center",
    });
    setScrapingResult(null);
    setStatus("to-search");
    setEmail("");
    setSelectedResult(null);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleSendPdf = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scrapingResult || !email) return;

    setIsSendingPdf(true);
    try {
      const body = {
        template: scrapingResult,
        email,
        albumName: selectedResult ? selectedResult.album : "album",
      };
      toast.loading("Sending PDF...", { id: "sending-pdf" });
      await sendAlbumEmail(body);
      handleSendedAlbum();
    } catch (error) {
      console.error("Error sending PDF:", error);
      toast.error("Failed to send PDF. Please try again.");
    } finally {
      setIsSendingPdf(false);
      toast.dismiss("sending-pdf");
    }
  };

  const handleClearPdf = () => {
    setScrapingResult(null);
    setEmail("");
    setSelectedResult(null);
  };

  const handleMusicSelection = (newSelectedResult: SearchSuggestion) => {
    if (newSelectedResult.album === selectedResult?.album) {
      setSelectedResult(null);
      return;
    }
    setSelectedResult(newSelectedResult);
  };

  return (
    <div className="w-full max-w-md space-y-2 duration-1200 ease-in-out animate-in fade-in slide-in-from-bottom-4">
      <Form onMusicSelection={handleMusicSelection} />
      {selectedResult && !isGeneratingPdf && status !== "pdf-preview" && (
        <SelectedResult
          data={selectedResult}
          handleGenerateClick={() => handlePdfGeneration(selectedResult.id)}
        />
      )}

      {(scrapingResult || isGeneratingPdf) && (
        <PdfPresentation
          search={selectedResult}
          data={scrapingResult}
          onClear={handleClearPdf}
        />
      )}

      {scrapingResult && !isGeneratingPdf && (
        <form onSubmit={handleSendPdf}>
          <div className="grid w-full items-center gap-1.5 mb-2">
            <Label htmlFor="email">Email</Label>
            <Input
              required={true}
              placeholder="Enter your kindle email..."
              onChange={(v) => setEmail(v.target.value)}
              value={email}
              type="email"
            />
          </div>
          <Button className="w-full" type="submit" disabled={isSendingPdf}>
            Send PDF
          </Button>
        </form>
      )}
    </div>
  );
}
