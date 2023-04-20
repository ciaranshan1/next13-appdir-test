import { GetServerSideProps } from "next";
 import { IncomingHttpHeaders } from "http";

// Define a type for our product data
type Product = {
  name: string | string[] | undefined;
  headers: string[]
};

// Define a type for our props
interface PropductProps {
  product: Product;
}

// Export the page component
export default function productsPage({ product }: PropductProps) {
  // Render the product
  return (
    <div style={{ height: "100vh", padding: 50 }}>
      <h1 style={{ color: "red" }}>Device Type: {product.name}</h1>
      <p>Headers: {product.headers} </p>
    </div>
  );
}

// Export the getServerSideProps function with GetServerSideProps type
export const getServerSideProps: GetServerSideProps<{
  product: Product;
}> = async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  const { req } = context;
  let devicetype = req.headers["x-atlas-device-type"];
  console.log(devicetype);
  
  if (devicetype == undefined) {
    devicetype = "notset";
  }

  context.res.setHeader(
    "x-atlas-device-type",
    devicetype
  );

  let hrs = []
  for (var k in req.headers) {
    hrs.push(k.toString())
  }

  return {
    props: {
      product: {
        name: devicetype,
        headers: hrs
      },
    },
  };
};
