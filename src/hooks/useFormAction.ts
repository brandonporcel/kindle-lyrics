import { useState } from "react";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { generatePDF, getPDFTemplate } from "@/actions/pdf.actions";
import { sendAlbumEmail } from "@/actions/email.actions";
import { SearchSuggestion } from "@/types";
import useFormActionStore from "@/stores/form-action.store";

function useFormAction() {
  const {
    isGeneratingPdf,
    setIsGeneratingPdf,
    status,
    setStatus,
    selectedResult,
    setSelectedResult,
    isLoading,
    setIsLoading,
  } = useFormActionStore();
  const [scrapingResult, setScrapingResult] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [isSendingPdf, setIsSendingPdf] = useState(false);

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
      setStatus("to-search");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleSuccessSending = () => {
    toast.success("Pdf with lyrics sent correctly!", {
      position: "top-center",
    });
    setScrapingResult(null);
    setStatus("to-search");
    setEmail("");
    setSelectedResult(null);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  const handleSendPdf = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scrapingResult || !email) return;

    setIsSendingPdf(true);
    try {
      toast.loading("Sending PDF...", { id: "sending-pdf" });
      await sendAlbumEmail({
        template: scrapingResult,
        email,
        albumName: selectedResult ? selectedResult.album : "album",
      });
      handleSuccessSending();
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
    setStatus("to-search");
  };

  const onMusicSelection = (newSelectedResult: SearchSuggestion) => {
    if (newSelectedResult.album === selectedResult?.album) {
      setSelectedResult(null);
      return;
    }
    setSelectedResult(newSelectedResult);
  };

  const downloadPDF = async (template: string | null) => {
    if (!template) return;

    try {
      setIsGeneratingPdf(true);

      const base64PDF = await generatePDF({ source: template });

      const binaryString = window.atob(base64PDF.base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: "application/pdf" });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `lyrics-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log("✅ PDF downloaded successfully!");
    } catch (error: any) {
      console.error("❌ Error downloading PDF:", error.message);
      alert("Failed to generate PDF");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return {
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
    onMusicSelection,
    isLoading,
    setIsLoading,
    downloadPDF,
  };
}

export default useFormAction;
