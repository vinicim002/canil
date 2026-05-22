package com.vinicius.backend.infrastructure.n8n;

public final class TelefoneMatcher {

    private TelefoneMatcher() {}

    public static String apenasDigitos(String telefone) {
        if (telefone == null) {
            return "";
        }
        return telefone.replaceAll("\\D", "");
    }

    public static boolean correspondem(String telefoneA, String telefoneB) {
        String a = apenasDigitos(telefoneA);
        String b = apenasDigitos(telefoneB);
        if (a.isEmpty() || b.isEmpty()) {
            return false;
        }
        if (a.equals(b)) {
            return true;
        }
        return sufixoComparavel(a).equals(sufixoComparavel(b));
    }

    /** Últimos 10–11 dígitos (DDD + número) para comparar com/sem DDI 55. */
    private static String sufixoComparavel(String digits) {
        if (digits.length() <= 11) {
            return digits;
        }
        return digits.substring(digits.length() - 11);
    }
}
