"use client";

import Form from "@/components/form";
import PdfPresentation from "../pdf-presentation";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import SelectedResult from "../selected-result";
import useFormAction from "@/hooks/useFormAction";

export default function FormAction() {
  const {
    scrapingResult,
    email,
    setEmail,
    selectedResult,
    status,
    isSendingPdf,
    isGeneratingPdf,
    handlePdfGeneration,
    handleSendPdf,
    handleClearPdf,
    handleMusicSelection,
  } = useFormAction();

  return (
    <div className="w-full max-w-lg space-y-2 duration-1200 ease-in-out animate-in fade-in slide-in-from-bottom-4">
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
              required
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
