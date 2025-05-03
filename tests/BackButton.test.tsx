import { render, screen, fireEvent } from "@testing-library/react";
import BackButton from "@/components/BackButton";

describe("BackButton", () => {
  it("renders the button with correct text", () => {
    render(<BackButton />);
    expect(screen.getByRole("button", { name: /back/i })).toBeInTheDocument();
  });

  it("calls window.history.back() when clicked", () => {
    const mockBack = jest.spyOn(window.history, "back").mockImplementation(() => {});
    render(<BackButton />);
    fireEvent.click(screen.getByRole("button", { name: /back/i }));
    expect(mockBack).toHaveBeenCalledTimes(1);
    mockBack.mockRestore(); // clean up
  });
});
