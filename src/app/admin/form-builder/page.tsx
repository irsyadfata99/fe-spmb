// src/app/admin/form-builder/page.tsx
"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FormField, FieldType } from "@/types";
import { FIELD_TYPES } from "@/lib/constants";

// Sortable Field Item Component
function SortableFieldItem({
  field,
  onEdit,
  onDelete,
}: {
  field: FormField;
  onEdit: (field: FormField) => void;
  onDelete: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white border border-gray-200 rounded-lg p-4 mb-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div
            {...attributes}
            {...listeners}
            className="cursor-move p-2 hover:bg-gray-100 rounded"
          >
            <div className="w-6 h-6 flex flex-col justify-center gap-1">
              <div className="h-0.5 w-full bg-gray-400"></div>
              <div className="h-0.5 w-full bg-gray-400"></div>
              <div className="h-0.5 w-full bg-gray-400"></div>
            </div>
          </div>

          <div className="flex-1">
            <p className="font-medium text-gray-900">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </p>
            <p className="text-sm text-gray-500">
              {FIELD_TYPES.find((ft) => ft.value === field.type)?.label}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(field)}
            className="px-3 py-1 text-sm text-secondary-600 hover:bg-secondary-50 rounded-lg transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(field.id)}
            className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FormBuilderPage() {
  const [fields, setFields] = useState<FormField[]>([]);
  const [isAddingField, setIsAddingField] = useState(false);
  const [editingField, setEditingField] = useState<FormField | null>(null);
  const [newField, setNewField] = useState<Partial<FormField>>({
    type: "text",
    label: "",
    placeholder: "",
    required: false,
    options: [],
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setFields((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);

        // Update order
        return newItems.map((item, index) => ({
          ...item,
          order: index + 1,
        }));
      });
    }
  };

  const handleAddField = () => {
    if (!newField.label) {
      alert("Label harus diisi");
      return;
    }

    const field: FormField = {
      id: `field-${Date.now()}`,
      type: newField.type as FieldType,
      label: newField.label,
      placeholder: newField.placeholder,
      required: newField.required || false,
      options: newField.options,
      order: fields.length + 1,
    };

    setFields([...fields, field]);
    setNewField({
      type: "text",
      label: "",
      placeholder: "",
      required: false,
      options: [],
    });
    setIsAddingField(false);
  };

  const handleEditField = () => {
    if (!editingField || !editingField.label) {
      return;
    }

    setFields(fields.map((f) => (f.id === editingField.id ? editingField : f)));
    setEditingField(null);
  };

  const handleDeleteField = (id: string) => {
    if (confirm("Hapus field ini?")) {
      setFields(fields.filter((f) => f.id !== id));
    }
  };

  const handleSaveForm = () => {
    if (fields.length === 0) {
      alert("Tambahkan minimal 1 field");
      return;
    }

    alert(`Form berhasil disimpan!\nTotal ${fields.length} field`);
  };

  const currentField = editingField || newField;
  const isEditing = editingField !== null;

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pembuat Form</h1>
        <p className="text-gray-600">
          Buat dan kelola form pendaftaran dengan drag & drop
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Fields List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Field Form ({fields.length})
              </h2>
              <button
                onClick={() => setIsAddingField(!isAddingField)}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                {isAddingField ? "Batal" : "Tambah Field"}
              </button>
            </div>

            {fields.length === 0 && !isAddingField && (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">
                  Belum ada field. Klik tombol "Tambah Field" untuk memulai.
                </p>
              </div>
            )}

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={fields.map((f) => f.id)}
                strategy={verticalListSortingStrategy}
              >
                {fields.map((field) => (
                  <SortableFieldItem
                    key={field.id}
                    field={field}
                    onEdit={setEditingField}
                    onDelete={handleDeleteField}
                  />
                ))}
              </SortableContext>
            </DndContext>

            {fields.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSaveForm}
                  className="w-full bg-accent-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-accent-700 transition-colors"
                >
                  Simpan Form
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Field Editor */}
        {(isAddingField || isEditing) && (
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {isEditing ? "Edit Field" : "Tambah Field Baru"}
              </h3>

              <div className="space-y-4">
                {/* Field Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipe Field
                  </label>
                  <select
                    value={currentField.type}
                    onChange={(e) => {
                      if (isEditing) {
                        setEditingField({
                          ...editingField!,
                          type: e.target.value as FieldType,
                        });
                      } else {
                        setNewField({
                          ...newField,
                          type: e.target.value as FieldType,
                        });
                      }
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {FIELD_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Label */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Label <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={currentField.label || ""}
                    onChange={(e) => {
                      if (isEditing) {
                        setEditingField({
                          ...editingField!,
                          label: e.target.value,
                        });
                      } else {
                        setNewField({ ...newField, label: e.target.value });
                      }
                    }}
                    placeholder="Contoh: Nama Lengkap"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {/* Placeholder */}
                {["text", "textarea", "email", "phone", "number"].includes(
                  currentField.type || ""
                ) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Placeholder
                    </label>
                    <input
                      type="text"
                      value={currentField.placeholder || ""}
                      onChange={(e) => {
                        if (isEditing) {
                          setEditingField({
                            ...editingField!,
                            placeholder: e.target.value,
                          });
                        } else {
                          setNewField({
                            ...newField,
                            placeholder: e.target.value,
                          });
                        }
                      }}
                      placeholder="Teks bantuan untuk user"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                )}

                {/* Options for select and checkbox */}
                {["select", "checkbox"].includes(currentField.type || "") && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Opsi (pisahkan dengan koma)
                    </label>
                    <textarea
                      value={currentField.options?.join(", ") || ""}
                      onChange={(e) => {
                        const options = e.target.value
                          .split(",")
                          .map((o) => o.trim())
                          .filter((o) => o);
                        if (isEditing) {
                          setEditingField({ ...editingField!, options });
                        } else {
                          setNewField({ ...newField, options });
                        }
                      }}
                      placeholder="Opsi 1, Opsi 2, Opsi 3"
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                )}

                {/* Required */}
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={currentField.required || false}
                      onChange={(e) => {
                        if (isEditing) {
                          setEditingField({
                            ...editingField!,
                            required: e.target.checked,
                          });
                        } else {
                          setNewField({
                            ...newField,
                            required: e.target.checked,
                          });
                        }
                      }}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Field wajib diisi
                    </span>
                  </label>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4">
                  <button
                    onClick={() => {
                      setIsAddingField(false);
                      setEditingField(null);
                      setNewField({
                        type: "text",
                        label: "",
                        placeholder: "",
                        required: false,
                        options: [],
                      });
                    }}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={isEditing ? handleEditField : handleAddField}
                    className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                  >
                    {isEditing ? "Update" : "Tambah"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
