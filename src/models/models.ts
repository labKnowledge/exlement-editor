// models.ts
export interface ComponentData {
  id: string;
  type: string;
  name: string;
  children: ComponentData[];
  props: Record<string, any>;
  parent: string | null;
  isContainer: boolean;
}
