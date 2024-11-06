export const TRANSACTION_CATEGORY_LABEL = {
  HOUSING: "Habitação",
  TRANSPORTATION: "Transporte",
  FOOD: "Alimentação",
  ENTERTAINMENT: "Lazer",
  HEALTH: "Saúde",
  EDUCATION: "Educação",
  OTHER: "Outros",
  UTILITY: "Utilidades",
  SALARY: "Salário",
};

export const TRANSACTION_PAYMENT_METHOD_LABEL = {
  CASH: "Dinheiro",
  CREDIT_CARD: "Cartão de Crédito",
  DEBIT_CARD: "Cartão de Débito",
  BANK_TRANSFER: "Transferência Bancária",
  PIX: "PIX",
  BANK_SLIP: "Boleto",
  OTHER: "Outro",
};

export const TRANSACTION_TYPE_LABEL = {
  EXPENSE: "Despesa",
  INVESTMENT: "Investimento",
  DEPOSIT: "Depósito",
};

export const TRANSACTION_TYPE_OPTIONS = Object.entries(
  TRANSACTION_TYPE_LABEL,
).map(([key, value]) => ({
  value: key,
  label: value,
}));

export const TRANSACTION_CATEGORY_OPTIONS = Object.entries(
  TRANSACTION_CATEGORY_LABEL,
).map(([key, value]) => ({
  value: key,
  label: value,
}));

export const TRANSACTION_PAYMENT_METHOD_OPTIONS = Object.entries(
  TRANSACTION_PAYMENT_METHOD_LABEL,
).map(([key, value]) => ({
  value: key,
  label: value,
}));
