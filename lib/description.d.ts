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

export interface PackageDescription {
    $schema?: string;
    defaultDescriptionsFile?: string;
    dependencies: Record<string, Description>;
    devDependencies: Record<string, Description>;
    optionalDependencies: Record<string, Description>;
    peerDependencies: Record<string, Description>;
}

export interface Problem {
    level: 'error' | 'warn';
    path: string;
    message: string;
}
