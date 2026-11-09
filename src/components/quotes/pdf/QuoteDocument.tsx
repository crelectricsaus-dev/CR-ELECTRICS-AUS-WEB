"use client";

import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { Quote } from "@/lib/quotes/types";
import { computeTotals, materialLineTotal } from "@/lib/quotes/calculations";
import { formatCurrency, formatDate } from "@/lib/quotes/format";
import { PAYMENT_SCHEDULE_LABELS } from "@/lib/quotes/constants";
import { site } from "@/lib/site";

const INK = "#0a0a0c";
const ELECTRIC = "#2457ff";
const ELECTRIC_DARK = "#1339a8";
const MIST = "#f4f5f7";
const MIST_LINE = "#e2e4ea";

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontSize: 9,
    fontFamily: "Helvetica",
    color: INK,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  logo: { width: 92, height: 50, objectFit: "contain" },
  brandBlock: { flexDirection: "row", alignItems: "center", gap: 8 },
  brandName: { fontSize: 13, fontFamily: "Helvetica-Bold", letterSpacing: 0.5 },
  brandSub: { fontSize: 7, color: ELECTRIC_DARK, letterSpacing: 2, marginTop: 1 },
  quoteTitle: { fontSize: 20, fontFamily: "Helvetica-Bold", color: ELECTRIC, textAlign: "right" },
  quoteMetaLine: { fontSize: 8, color: "#555", textAlign: "right" },
  divider: { height: 2, backgroundColor: ELECTRIC, marginBottom: 14 },
  twoCol: { flexDirection: "row", gap: 16, marginBottom: 14 },
  col: { flex: 1 },
  cardTitle: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#fff",
    backgroundColor: INK,
    paddingVertical: 4,
    paddingHorizontal: 8,
    letterSpacing: 1,
  },
  cardBody: { borderWidth: 1, borderColor: MIST_LINE, borderTopWidth: 0, padding: 8 },
  line: { marginBottom: 2, lineHeight: 1.4 },
  bold: { fontFamily: "Helvetica-Bold" },
  sectionTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: ELECTRIC_DARK,
    marginBottom: 5,
    marginTop: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  paragraph: { lineHeight: 1.45, marginBottom: 3, color: "#222" },
  table: { borderWidth: 1, borderColor: MIST_LINE, marginBottom: 4 },
  tableHeaderRow: { flexDirection: "row", backgroundColor: INK },
  tableRow: { flexDirection: "row", borderTopWidth: 1, borderTopColor: MIST_LINE },
  tableRowAlt: { flexDirection: "row", borderTopWidth: 1, borderTopColor: MIST_LINE, backgroundColor: MIST },
  th: { color: "#fff", fontSize: 7.5, fontFamily: "Helvetica-Bold", padding: 5, letterSpacing: 0.3 },
  td: { fontSize: 8.5, padding: 5, color: "#222" },
  summaryBox: {
    marginTop: 8,
    alignSelf: "flex-end",
    width: 220,
    borderWidth: 1,
    borderColor: MIST_LINE,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: MIST_LINE,
  },
  summaryTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 7,
    paddingHorizontal: 8,
    backgroundColor: ELECTRIC,
  },
  summaryTotalText: { color: "#fff", fontFamily: "Helvetica-Bold", fontSize: 10 },
  termsItem: { marginBottom: 3, lineHeight: 1.4, color: "#333" },
  signatureRow: { flexDirection: "row", gap: 20, marginTop: 10 },
  signatureBox: { flex: 1 },
  signatureLine: { borderBottomWidth: 1, borderBottomColor: "#999", marginTop: 24, marginBottom: 4 },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 36,
    right: 36,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 7,
    color: "#888",
    borderTopWidth: 1,
    borderTopColor: MIST_LINE,
    paddingTop: 6,
  },
});

function scopeLines(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

export function QuoteDocument({ quote }: { quote: Quote }) {
  const totals = computeTotals(quote);
  const scope = scopeLines(quote.job.scopeOfWorks);
  const terms = quote.termsAndConditions.split("\n").map((l) => l.trim()).filter(Boolean);

  return (
    <Document title={`${quote.quoteNumber} - ${quote.projectName || site.name}`}>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.headerRow}>
          <View style={styles.brandBlock}>
            {/* eslint-disable-next-line jsx-a11y/alt-text -- react-pdf's Image is a PDF node, not an HTML <img>; it has no alt prop */}
            <Image src="/logo-full-ink.png" style={styles.logo} />
            <View>
              <Text style={styles.brandSub}>A-GRADE LICENSED ELECTRICAL CONTRACTOR</Text>
            </View>
          </View>
          <View>
            <Text style={styles.quoteTitle}>QUOTE</Text>
            <Text style={styles.quoteMetaLine}>{quote.quoteNumber}</Text>
            <Text style={styles.quoteMetaLine}>Issued: {formatDate(quote.dateIssued)}</Text>
            <Text style={styles.quoteMetaLine}>Valid until: {formatDate(quote.expiryDate)}</Text>
          </View>
        </View>
        <View style={styles.divider} />

        <View style={styles.twoCol}>
          <View style={styles.col}>
            <Text style={styles.cardTitle}>FROM</Text>
            <View style={styles.cardBody}>
              <Text style={[styles.line, styles.bold]}>{site.name}</Text>
              <Text style={styles.line}>{site.fullAddress}</Text>
              <Text style={styles.line}>Phone: {site.phone}</Text>
              <Text style={styles.line}>Email: {site.email}</Text>
              <Text style={styles.line}>A-Grade Electrician</Text>
              <Text style={styles.line}>REC Licensed Electrical Contractor</Text>
            </View>
          </View>
          <View style={styles.col}>
            <Text style={styles.cardTitle}>QUOTE FOR</Text>
            <View style={styles.cardBody}>
              <Text style={[styles.line, styles.bold]}>{quote.client.clientName || "—"}</Text>
              {quote.client.companyName ? <Text style={styles.line}>{quote.client.companyName}</Text> : null}
              {quote.client.phone ? <Text style={styles.line}>Phone: {quote.client.phone}</Text> : null}
              {quote.client.email ? <Text style={styles.line}>Email: {quote.client.email}</Text> : null}
              <Text style={styles.line}>Site: {quote.client.siteAddress || "—"}</Text>
              {!quote.client.sameAsSite && quote.client.billingAddress ? (
                <Text style={styles.line}>Billing: {quote.client.billingAddress}</Text>
              ) : null}
              {quote.projectName ? <Text style={styles.line}>Project: {quote.projectName}</Text> : null}
            </View>
          </View>
        </View>

        {(quote.job.jobDescription || scope.length > 0) && (
          <View>
            <Text style={styles.sectionTitle}>Scope of Works</Text>
            {quote.job.jobDescription ? <Text style={styles.paragraph}>{quote.job.jobDescription}</Text> : null}
            {scope.map((line, i) => (
              <Text key={i} style={styles.paragraph}>
                {line.startsWith("•") ? line : `• ${line}`}
              </Text>
            ))}
          </View>
        )}

        {quote.job.clientRequirements ? (
          <View>
            <Text style={styles.sectionTitle}>Client Requirements</Text>
            <Text style={styles.paragraph}>{quote.job.clientRequirements}</Text>
          </View>
        ) : null}

        {quote.job.specialConditions ? (
          <View>
            <Text style={styles.sectionTitle}>Special Conditions</Text>
            <Text style={styles.paragraph}>{quote.job.specialConditions}</Text>
          </View>
        ) : null}

        {quote.labourLines.length > 0 && (
          <View wrap={false}>
            <Text style={styles.sectionTitle}>Labour</Text>
            <View style={styles.table}>
              <View style={styles.tableHeaderRow}>
                <Text style={[styles.th, { flex: 3 }]}>Description</Text>
                <Text style={[styles.th, { flex: 1, textAlign: "right" }]}>Hours</Text>
                <Text style={[styles.th, { flex: 1, textAlign: "right" }]}>Rate</Text>
                <Text style={[styles.th, { flex: 1, textAlign: "right" }]}>Amount</Text>
              </View>
              {quote.labourLines.map((line, i) => (
                <View key={line.id} style={i % 2 === 1 ? styles.tableRowAlt : styles.tableRow}>
                  <Text style={[styles.td, { flex: 3 }]}>{line.task}</Text>
                  <Text style={[styles.td, { flex: 1, textAlign: "right" }]}>{line.hours}</Text>
                  <Text style={[styles.td, { flex: 1, textAlign: "right" }]}>{formatCurrency(line.billingRate)}</Text>
                  <Text style={[styles.td, { flex: 1, textAlign: "right" }]}>
                    {formatCurrency(line.hours * line.billingRate)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {quote.materialLines.length > 0 && (
          <View wrap={false}>
            <Text style={styles.sectionTitle}>Materials</Text>
            <View style={styles.table}>
              <View style={styles.tableHeaderRow}>
                <Text style={[styles.th, { flex: 3 }]}>Item</Text>
                <Text style={[styles.th, { flex: 1, textAlign: "right" }]}>Qty</Text>
                <Text style={[styles.th, { flex: 1, textAlign: "right" }]}>Unit Price</Text>
                <Text style={[styles.th, { flex: 1, textAlign: "right" }]}>Amount</Text>
              </View>
              {quote.materialLines.map((line, i) => {
                const total = materialLineTotal(line.quantity, line.unitCost, line.markupPercent);
                const unitPrice = line.quantity > 0 ? total / line.quantity : 0;
                return (
                  <View key={line.id} style={i % 2 === 1 ? styles.tableRowAlt : styles.tableRow}>
                    <View style={{ flex: 3, padding: 5 }}>
                      <Text style={{ fontSize: 8.5 }}>{line.name || "Item"}</Text>
                      {line.description ? <Text style={{ fontSize: 7, color: "#777" }}>{line.description}</Text> : null}
                    </View>
                    <Text style={[styles.td, { flex: 1, textAlign: "right" }]}>{line.quantity}</Text>
                    <Text style={[styles.td, { flex: 1, textAlign: "right" }]}>{formatCurrency(unitPrice)}</Text>
                    <Text style={[styles.td, { flex: 1, textAlign: "right" }]}>{formatCurrency(total)}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {(quote.additionalCharges.length > 0 || totals.additionalSubtotal > 0) && (
          <View wrap={false}>
            <Text style={styles.sectionTitle}>Additional Costs</Text>
            <View style={styles.table}>
              <View style={styles.tableHeaderRow}>
                <Text style={[styles.th, { flex: 3 }]}>Description</Text>
                <Text style={[styles.th, { flex: 1, textAlign: "right" }]}>Amount</Text>
              </View>
              {quote.travel.fee > 0 && (
                <View style={styles.tableRow}>
                  <Text style={[styles.td, { flex: 3 }]}>Travel fee</Text>
                  <Text style={[styles.td, { flex: 1, textAlign: "right" }]}>{formatCurrency(quote.travel.fee)}</Text>
                </View>
              )}
              {quote.additionalCharges.map((c, i) => (
                <View key={c.id} style={i % 2 === 1 ? styles.tableRowAlt : styles.tableRow}>
                  <Text style={[styles.td, { flex: 3 }]}>{c.description ? `${c.type} — ${c.description}` : c.type}</Text>
                  <Text style={[styles.td, { flex: 1, textAlign: "right" }]}>{formatCurrency(c.amount)}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={styles.summaryBox}>
          <View style={[styles.summaryRow, { borderTopWidth: 0 }]}>
            <Text>Labour subtotal</Text>
            <Text>{formatCurrency(totals.labourSubtotal)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Materials subtotal</Text>
            <Text>{formatCurrency(totals.materialsSubtotal)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Additional costs</Text>
            <Text>{formatCurrency(totals.additionalSubtotal)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.bold]}>
            <Text>Subtotal</Text>
            <Text>{formatCurrency(totals.subtotal)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>{quote.gstEnabled ? "GST (10%)" : "GST (not applicable)"}</Text>
            <Text>{formatCurrency(totals.gst)}</Text>
          </View>
          <View style={styles.summaryTotalRow}>
            <Text style={styles.summaryTotalText}>TOTAL</Text>
            <Text style={styles.summaryTotalText}>{formatCurrency(totals.total)}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Payment</Text>
        <Text style={styles.paragraph}>Payment method: {quote.paymentMethod || "—"}</Text>
        <Text style={styles.paragraph}>
          Payment schedule: {PAYMENT_SCHEDULE_LABELS[quote.paymentSchedule]}
          {quote.paymentSchedule === "deposit-final" ? ` (${quote.depositPercent}% deposit, balance on completion)` : ""}
        </Text>
        {quote.bankDetails ? (
          <View style={{ borderWidth: 1, borderColor: MIST_LINE, padding: 8, marginTop: 3, backgroundColor: MIST }}>
            {quote.bankDetails.split("\n").map((l, i) => (
              <Text key={i} style={{ fontSize: 8, lineHeight: 1.5 }}>
                {l}
              </Text>
            ))}
          </View>
        ) : null}

        <Text style={styles.sectionTitle} break>
          Terms & Conditions
        </Text>
        {terms.map((t, i) => (
          <Text key={i} style={styles.termsItem}>
            {t}
          </Text>
        ))}

        <Text style={styles.sectionTitle}>Acceptance</Text>
        <Text style={styles.paragraph}>
          By signing below, the client accepts this quote in full and authorises CR Electrics Australia to commence
          the work described above.
        </Text>
        <View style={styles.signatureRow}>
          <View style={styles.signatureBox}>
            <Text style={{ fontSize: 8, color: "#666" }}>Client name</Text>
            <View style={styles.signatureLine} />
            <Text style={{ fontSize: 8, color: "#666", marginTop: 14 }}>Client signature</Text>
            <View style={styles.signatureLine} />
            <Text style={{ fontSize: 8, color: "#666", marginTop: 14 }}>Date</Text>
            <View style={styles.signatureLine} />
          </View>
          <View style={styles.signatureBox}>
            <Text style={{ fontSize: 8, color: "#666" }}>For CR Electrics Australia</Text>
            <View style={styles.signatureLine} />
            <Text style={{ fontSize: 8, color: "#666", marginTop: 14 }}>Signature</Text>
            <View style={styles.signatureLine} />
            <Text style={{ fontSize: 8, color: "#666", marginTop: 14 }}>Date</Text>
            <View style={styles.signatureLine} />
          </View>
        </View>

        <View style={styles.footer} fixed>
          <Text>
            {site.name} · {site.phone} · {site.email}
          </Text>
          <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
}
