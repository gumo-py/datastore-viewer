export default class Entity implements EntityObject{
    readonly projectId: string;
    readonly URLSafeKey: string;
    readonly key: KeyObject;
    properties: Array<Property>;

    constructor( projectId: string, URLSafeKey: string, key: KeyObject, properties: Array<Property> ) {
        this.projectId = projectId;
        this.URLSafeKey = URLSafeKey;
        this.key = key;
        this.properties = properties;
    }
}