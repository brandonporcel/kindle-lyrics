"use client";
import { useState } from "react";
import Form from "@/components/form";
import PdfPresentation from "../pdf-presentation";
import { getPDFTemplate } from "@/actions";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import SelectedResult from "../selected-result";
import { SearchSuggestion } from "@/types";

export default function FormAction() {
  const [scrapingResult, setScrapingResult] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [selectedResult, setSelectedResult] = useState<SearchSuggestion | null>(
    null
  );
  const [status, setStatus] = useState<"to-search" | "pdf-preview">(
    "to-search"
  );
  const [isSendingPdf, setIsSendingPdf] = useState<boolean>(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);

  const handlePdfGeneration = async (albumId: string) => {
    setIsGeneratingPdf(true);
    setStatus("pdf-preview");
    try {
      const res = await getPDFTemplate({ albumId });
      setScrapingResult(res);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleSendPdf = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSendingPdf(true);
    try {
      if (!scrapingResult || !email) return;
      alert("PDF sent successfully!");
    } catch (error) {
      console.error("Error sending PDF:", error);
      alert("Failed to send PDF. Please try again.");
    } finally {
      setIsSendingPdf(false);
    }
  };

  const handleClearPdf = () => {
    setScrapingResult(null);
    setEmail("");
    setSelectedResult(null);
  };

  const handleMusicSelection = (result: any) => {
    setSelectedResult(result);
  };

  return (
    <div className="w-full max-w-md space-y-4 duration-1200 ease-in-out animate-in fade-in slide-in-from-bottom-4 mb-4">
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
              placeholder="brandon@gmail.com"
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
