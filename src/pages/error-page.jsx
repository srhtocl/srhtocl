import React from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  const errorStyle = "flex flex-col items-center justify-center h-screen bg-gray-100 font-sans text-xl text-red-600";

  const errorMessageStyle = "my-4 text-center italic";

  return (
    <div id="error-page" className={errorStyle}>
      <p>
        Bir Hata Oluştu: <i>{error.statusText || error.message}</i>
      </p>
      <p className={errorMessageStyle}>
        Lütfen daha sonra tekrar deneyin veya destek ekibimizle iletişime geçin.
      </p>
    </div>
  );
}
