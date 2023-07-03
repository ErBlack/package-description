interface ActualDescription {
    status: 'actual';
    description: string;
}

interface OutdatedDescription {
    status: 'outdated';
    description: string;
    issueLink: string;
}

interface DeprecatedDescription {
    status: 'deprecated';
    description: string;
    issueLink: string;
    replacement?: string;
}

interface UnknownDescription {
    status: 'unknown';
    description: '';
}

export type Description = ActualDescription | OutdatedDescription | DeprecatedDescription | UnknownDescription;