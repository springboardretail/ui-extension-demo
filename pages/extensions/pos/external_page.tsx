import Link from "next/link";
import { useRouter } from "next/router";

type QueryParams = {
  ticket_id: string;
  customer_id: string;
  account_uuid: string;
  subdomain: string;
  pos_url: string;
};

export default function ExternalPage() {
  const router = useRouter();
  const query = router.query as QueryParams;

  return (
    <main style={{ margin: 20 }}>
      <h1>This is an external page</h1>
      <h2>Ticket information</h2>
      {Object.entries(query).map(([key, value]) => (
        <p key={key}>
          {key}: {value}
        </p>
      ))}

      {query.pos_url && <Link href={query.pos_url}>Back to POS</Link>}
    </main>
  );
}
