import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Contact } from "./Contact";

vi.mock("../data/usePortfolio", () => ({
  useContactConfig: () => ({
    email: "contact@example.com",
    subject: "Portfolio message",
    successMessage: "Mensaje enviado correctamente.",
    errorMessage: "No se pudo enviar el mensaje.",
  }),
  useSocial: () => [],
}));

function fillContactForm() {
  fireEvent.change(screen.getByLabelText("Tu nombre"), {
    target: { value: "Ana Rivera" },
  });
  fireEvent.change(screen.getByLabelText("Tu correo electrónico"), {
    target: { value: "ana@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Tu mensaje"), {
    target: { value: "Quisiera conversar sobre un proyecto." },
  });
}

describe("Contact form", () => {
  afterEach(cleanup);

  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  it("validates required fields without sending a request", () => {
    render(<Contact />);
    fireEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));

    expect(screen.getByText("El nombre es requerido")).toBeTruthy();
    expect(screen.getByText("El email es requerido")).toBeTruthy();
    expect(screen.getByText("El mensaje es requerido")).toBeTruthy();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("sends valid content and shows the success state", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ success: "true" }),
    } as Response);
    render(<Contact />);
    fillContactForm();
    fireEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));

    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Mensaje enviado correctamente." })).toBeTruthy(),
    );
    expect(fetch).toHaveBeenCalledWith(
      "https://formsubmit.co/ajax/contact%40example.com",
      expect.objectContaining({ method: "POST" }),
    );
    expect((screen.getByLabelText("Tu nombre") as HTMLInputElement).value).toBe("");
  });

  it("shows an error and keeps the entered message when delivery fails", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      json: async () => ({ success: "false" }),
    } as Response);
    render(<Contact />);
    fillContactForm();
    fireEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));

    await waitFor(() =>
      expect(screen.getByRole("button", { name: "No se pudo enviar el mensaje." })).toBeTruthy(),
    );
    expect((screen.getByLabelText("Tu mensaje") as HTMLTextAreaElement).value).toBe("Quisiera conversar sobre un proyecto.");
  });
});
