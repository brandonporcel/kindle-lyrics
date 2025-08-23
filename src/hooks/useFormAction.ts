import { useState } from "react";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { getPDFTemplate, sendAlbumEmail } from "@/actions";
import { SearchSuggestion } from "@/types";
import useFormActionStore from "@/stores/form-action.store";

function useFormAction() {
  const { isGeneratingPdf, setIsGeneratingPdf, status, setStatus } =
    useFormActionStore();
  const [scrapingResult, setScrapingResult] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [selectedResult, setSelectedResult] = useState<SearchSuggestion | null>(
    null
  );
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
      console.log("termino?");
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
    setStatus("to-search");
  };

  const handleMusicSelection = (newSelectedResult: SearchSuggestion) => {
    if (newSelectedResult.album === selectedResult?.album) {
      setSelectedResult(null);
      return;
    }
    setSelectedResult(newSelectedResult);
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
    handleMusicSelection,
  };
}

export default useFormAction;
