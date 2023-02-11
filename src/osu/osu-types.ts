
// Description: https://osu.ppy.sh/wiki/en/Client/File_formats/Osu_%28file_format%29

export interface Osu {
    osuFileFormat?: string;
    General?: OsuGeneral;
    Editor?: Editor;
    Metadata?: Metadata;
    Difficulty?: Difficulty;
    Events?: Events;
    TimingPoints?: TimingPoint[];
    Colours?: Colour[];
    HitObjects?: HitObject[];
}

export interface OsuGeneral {
    AudioFilename?: string;
    AudioLeadIn?: number;
    PreviewTime?: number;
    Countdown?: 0 | 1 | 2 | 3;
    SampleSet?: 'Normal' | 'Soft' | 'Drum';
    StackLeniency?: number;
    Mode?: 0 | 1 | 2 | 3;
    LetterboxInBreaks?: 0 | 1;
    UseSkinSprites?: 0 | 1;
    OverlayPosition?: 'NoChange' | 'Below' | 'Above'
    SkinPreference?: string;
    EpilepsyWarning?: 0 | 1;
    CountdownOffset?: number;
    SpecialStyle?: 0 | 1;
    WidescreenStoryboard?: 0 | 1;
    SamplesMatchPlaybackRate?: 0 | 1;
}

export interface Editor {
    Bookmarks?: number[];
    DistanceSpacing?: number;
    BeatDivisor?: number;
    GridSize?: number;
    TimelineZoom?: number;
}

export interface Metadata {
    Title?: string;
    TitleUnicode?: string;
    Artist?: string;
    ArtistUnicode?: string;
    Creator?: string;
    Version?: string;
    Source?: string;
    Tags?: string[];
    BeatmapID?: number;
    BeatmapSetID?: number;
}

export interface Difficulty {
    HPDrainRate?: number;
    CircleSize?: number;
    OverallDifficulty?: number;
    ApproachRate?: number;
    SliderMultiplier?: number;
    SliderTickRate?: number;
}

export interface Events {
    eventType?: string | number;
    startTime?: number;
    eventParams?: string[];
}

export interface TimingPoint {
    time: number;
    beatLength: number;
    meter: number;
    sampleSet: 0 | 1 | 2 | 3;
    sampleIndex: number;
    volume: number;
    uninherited: 0 | 1;
    effects: number;
}

export interface Colour {
    Combo?: string; // Not exactly this!!!
    SliderTrackOverride?: string;
    SliderBorder?: string;
}

export interface HitObject {
    x: number;
    y: number;
    time: number;
    type: number;
    hitSound: 0 | 1 | 2 | 3;
    objectParams?: number[];
    hitSample?: number[];
}
