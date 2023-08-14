import { z, defineCollection } from "astro:content"

enum Products {
  CCIP = "ccip",
  AUTOMATION = "automation",
  FUNCTIONS = "functions",
  VRF = "vrf",
  FEEDS = "feeds",
}

export const productsInfo: Record<Products, { name: string; slug: string }> = {
  ccip: { name: "CCIP", slug: "ccip" },
  automation: { name: "Automation", slug: "chainlink-automation/introduction" },
  functions: { name: "Functions", slug: "chainlink-functions" },
  vrf: { name: "VRF", slug: "vrf/v2/introduction" },
  feeds: { name: "Data Feeds", slug: "data-feeds" },
}

const productEnum = z.preprocess((val) => (val as string).toLowerCase(), z.nativeEnum(Products))

export const sectionEnum = z.enum([
  "anyApi",
  "global",
  "bif",
  "ccip",
  "automation",
  "chainlinkFunctions",
  "nodeOperator",
  "dataFeeds",
  "gettingStarted",
  "legacy",
  "vrf",
])

const baseFrontmatter = z
  .object({
    section: sectionEnum,
    date: z.string().optional(),
    title: z.string(),
    whatsnext: z.record(z.string(), z.string()).optional(),
    isMdx: z.boolean().optional(),
    isIndex: z.boolean().optional(),
    metadata: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
        image: z
          .object({
            0: z.string(),
          })
          .optional(),
        linkToWallet: z.boolean().optional(),
      })
      .optional(),
    excerpt: z.string().optional(),
    datafeedtype: z.string().optional(),
  })
  .strict()

const quickstartsFrontmatter = baseFrontmatter.extend({
  section: z.enum(["quickstarts"]),
  summary: z.string().optional(),
  image: z.string(),
  products: z.array(productEnum),
  time: z.string(),
  requires: z.string().optional(),
})

export type QuickstartsFrontmatter = z.infer<typeof quickstartsFrontmatter>

const baseCollection = defineCollection({
  type: "content",
  schema: baseFrontmatter,
})

const quickstartsCollection = defineCollection({
  type: "content",
  schema: quickstartsFrontmatter,
})

const anyApiCollection = baseCollection
const architectureOverviewCollection = baseCollection
const chainlinkAutomationCollection = baseCollection
const chainlinkFunctionsCollection = baseCollection
const chainlinkNodesCollection = baseCollection
const dataFeedsCollection = baseCollection
const gettingStartedCollection = baseCollection
const resourcesCollection = baseCollection
const vrfCollection = baseCollection
const ccipCollection = baseCollection

export const collections = {
  "any-api": anyApiCollection,
  "architecture-overview": architectureOverviewCollection,
  "chainlink-automation": chainlinkAutomationCollection,
  "chainlink-functions": chainlinkFunctionsCollection,
  "chainlink-nodes": chainlinkNodesCollection,
  "data-feeds": dataFeedsCollection,
  "getting-started": gettingStartedCollection,
  resources: resourcesCollection,
  vrf: vrfCollection,
  ccip: ccipCollection,
  quickstarts: quickstartsCollection,
}
