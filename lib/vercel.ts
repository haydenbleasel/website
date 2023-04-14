import 'server-only';

type VercelDeploymentsResponse = {
  deployments: {
    /** The unique identifier of the deployment. */
    uid: string;
    /** The name of the deployment. */
    name: string;
    /** The URL of the deployment. */
    url: string;
    /** Timestamp of when the deployment got created. */
    created: number;
    /** The source of the deployment. */
    source?: 'cli' | 'git' | 'import' | 'import/repo' | 'clone/repo';
    /** In which state is the deployment. */
    state?:
      | 'BUILDING'
      | 'ERROR'
      | 'INITIALIZING'
      | 'QUEUED'
      | 'READY'
      | 'CANCELED';
    /** The type of the deployment. */
    type: 'LAMBDAS';
    /** Metadata information of the user who created the deployment. */
    creator: {
      /** The unique identifier of the user. */
      uid: string;
      /** The email address of the user. */
      email?: string;
      /** The username of the user. */
      username?: string;
      /** The GitHub login of the user. */
      githubLogin?: string;
      /** The GitLab login of the user. */
      gitlabLogin?: string;
    };
    /** An object containing the deployment's metadata */
    meta?: Record<string, string>;
    /** On which environment has the deployment been deployed to. */
    target?: ('production' | 'staging') | null;
    /** An error object in case aliasing of the deployment failed. */
    aliasError?: {
      code: string;
      message: string;
    } | null;
    aliasAssigned?: (number | boolean) | null;
    /** Timestamp of when the deployment got created. */
    createdAt?: number;
    /** Timestamp of when the deployment started building at. */
    buildingAt?: number;
    /** Timestamp of when the deployment got ready. */
    ready?: number;
    /** State of all registered checks */
    checksState?: 'registered' | 'running' | 'completed';
    /** Conclusion for checks */
    checksConclusion?: 'succeeded' | 'failed' | 'skipped' | 'canceled';
    /** Vercel URL to inspect the deployment. */
    inspectorUrl: string | null;
    /** Deployment can be used for instant rollback */
    isRollbackCandidate?: boolean | null;
    /** The project settings which was used for this deployment */
    projectSettings?: {
      framework?:
        | (
            | 'blitzjs'
            | 'nextjs'
            | 'gatsby'
            | 'remix'
            | 'astro'
            | 'hexo'
            | 'eleventy'
            | 'docusaurus-2'
            | 'docusaurus'
            | 'preact'
            | 'solidstart'
            | 'dojo'
            | 'ember'
            | 'vue'
            | 'scully'
            | 'ionic-angular'
            | 'angular'
            | 'polymer'
            | 'svelte'
            | 'sveltekit'
            | 'sveltekit-1'
            | 'ionic-react'
            | 'create-react-app'
            | 'gridsome'
            | 'umijs'
            | 'sapper'
            | 'saber'
            | 'stencil'
            | 'nuxtjs'
            | 'redwoodjs'
            | 'hugo'
            | 'jekyll'
            | 'brunch'
            | 'middleman'
            | 'zola'
            | 'hydrogen'
            | 'vite'
            | 'vitepress'
            | 'vuepress'
            | 'parcel'
            | 'sanity'
          )
        | null;
      gitForkProtection?: boolean;
      gitLFS?: boolean;
      devCommand?: string | null;
      installCommand?: string | null;
      buildCommand?: string | null;
      nodeVersion?: '18.x' | '16.x' | '14.x' | '12.x' | '10.x';
      outputDirectory?: string | null;
      publicSource?: boolean | null;
      rootDirectory?: string | null;
      serverlessFunctionRegion?: string | null;
      sourceFilesOutsideRootDirectory?: boolean;
      commandForIgnoringBuildStep?: string | null;
      createdAt?: number;
      skipGitConnectDuringLink?: boolean;
    };
    /** The ID of Vercel Connect configuration used for this deployment */
    connectConfigurationId?: string;
  }[];
};

export const getLastDeployDate = async (): Promise<string> => {
  if (!process.env.VERCEL_TOKEN || !process.env.VERCEL_PROJECT_ID) {
    throw new Error('Missing Vercel token or project ID');
  }

  const endpoint = 'https://api.vercel.com/v6/deployments';
  const query = new URLSearchParams({
    limit: '1',
    projectId: process.env.VERCEL_PROJECT_ID,
  });

  const response = await fetch(`${endpoint}?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
    },
    method: 'get',
  });

  const data = (await response.json()) as VercelDeploymentsResponse;

  const lastDeploy = data.deployments[0];

  if (!lastDeploy.createdAt) {
    throw new Error('No deployments found');
  }

  const date = new Date(lastDeploy.createdAt);

  return date.toLocaleString('en-US', {
    timeZone: 'America/New_York',
    dateStyle: 'long',
    timeStyle: 'short',
  });
};
