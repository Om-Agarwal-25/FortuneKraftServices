"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Phone, MessageCircle } from "lucide-react";
import type { Service, ApiServiceResponse, ModalMode } from "@/types";

interface ServiceModalProps {
  service: Service;
  mode: ModalMode;
  onClose: () => void;
}

type FetchState =
  | { status: "loading" }
  | { status: "success"; data: ApiServiceResponse }
  | { status: "error" };

export default function ServiceModal({
  service,
  mode,
  onClose,
}: ServiceModalProps): JSX.Element {
  const [fetchState, setFetchState] = useState<FetchState>({
    status: "loading",
  });

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const res = await fetch(`/api/get-service?serviceId=${service.id}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setFetchState({ status: "success", data });
      } catch {
        setFetchState({ status: "error" });
      }
    };
    fetchServiceData();
  }, [service.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const renderContent = () => {
    if (fetchState.status === "loading") {
      return (
        <div className="p-8 space-y-6">
          <div className="h-6 w-1/3 bg-navy/10 rounded animate-pulse" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-navy/10 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-navy/10 rounded animate-pulse" />
            <div className="h-4 w-4/6 bg-navy/10 rounded animate-pulse" />
          </div>
          <div className="h-10 w-32 bg-navy/10 rounded animate-pulse mt-6" />
        </div>
      );
    }

    const dataObj =
      fetchState.status === "success"
        ? fetchState.data
        : {
            ...service,
            whatsappNumber: "919876543210",
            callNumber: "919876543210",
          };

    return (
      <div className="p-8">
        {fetchState.status === "error" && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-sm text-center">
            Live data unavailable — showing preview
          </div>
        )}

        <div className="mb-6">
          <p className="text-sm text-gold font-bold uppercase tracking-wider mb-2">
            {dataObj.duration}
          </p>
          <p className="text-gray-700 leading-relaxed text-lg">
            {dataObj.description}
          </p>
        </div>

        <div className="mb-8">
          <h4 className="font-bold text-navy mb-4">Plan Features</h4>
          <ul className="space-y-3">
            {dataObj.features.map((feature, idx) => (
              <li key={idx} className="flex gap-3 text-gray-700">
                <CheckCircle2
                  size={20}
                  className="text-success-green flex-shrink-0"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-gray-100 pt-6 flex items-end justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Pricing</p>
            <p className="text-4xl font-display font-bold text-navy">
              {dataObj.price}
            </p>
          </div>
        </div>

        {mode === "buy" && (
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href={`https://wa.me/${dataObj.whatsappNumber}?text=Hi, I am interested in the ${service.title} plan`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 bg-gold hover:bg-gold-light text-navy font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle size={20} /> Checkout via WhatsApp
            </a>
            <a
              href={`tel:+${dataObj.callNumber}`}
              className="flex-1 bg-navy hover:bg-navy-light text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Phone size={20} /> Request Callback
            </a>
          </div>
        )}
      </div>
    );
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            backgroundColor: "rgba(10, 22, 40, 0.85)",
            backdropFilter: "blur(4px)",
          }}
          className="absolute inset-0 cursor-pointer"
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="bg-white rounded-2xl w-full max-w-[640px] relative z-10 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          <div className="bg-navy p-6 flex items-center justify-between border-b border-white/10 shrink-0">
            <h2 className="text-white font-display text-2xl font-bold">
              {service.title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2 -mr-2 rounded-full hover:bg-white/10"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>
          <div className="overflow-y-auto">{renderContent()}</div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
