// NepaliDatePicker+SwiftUI.swift — SwiftUI bridge for NepaliDatePickerView
// NepaliDatePicker Swift Package

import SwiftUI
import UIKit

// MARK: - NepaliDatePickerRepresentable

/// A SwiftUI wrapper around the UIKit `NepaliDatePickerView`.
@available(iOS 14.0, *)
public struct NepaliDatePickerRepresentable: UIViewRepresentable {

    @Binding public var selection: BSDate?
    public var firstDate: BSDate?
    public var lastDate: BSDate?
    public var theme: NepaliDatePickerTheme
    public var lang: String

    public init(
        selection: Binding<BSDate?>,
        firstDate: BSDate? = nil,
        lastDate: BSDate? = nil,
        theme: NepaliDatePickerTheme = .defaultTheme,
        lang: String = "ne"
    ) {
        self._selection = selection
        self.firstDate = firstDate
        self.lastDate = lastDate
        self.theme = theme
        self.lang = lang
    }

    // MARK: Coordinator

    public class Coordinator: NSObject, NepaliDatePickerDelegate {
        var parent: NepaliDatePickerRepresentable

        init(_ parent: NepaliDatePickerRepresentable) {
            self.parent = parent
        }

        public func datePicker(_ picker: NepaliDatePickerView, didSelect date: BSDate) {
            parent.selection = date
        }
    }

    public func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }

    // MARK: UIViewRepresentable

    public func makeUIView(context: Context) -> NepaliDatePickerView {
        let picker = NepaliDatePickerView(theme: theme, lang: lang)
        picker.delegate = context.coordinator
        picker.firstDate = firstDate
        picker.lastDate = lastDate
        if let initial = selection {
            picker.displayYear = initial.year
            picker.displayMonth = initial.month
            picker.selectedDate = initial
        }
        return picker
    }

    public func updateUIView(_ uiView: NepaliDatePickerView, context: Context) {
        uiView.theme = theme
        uiView.lang = lang
        uiView.firstDate = firstDate
        uiView.lastDate = lastDate
        // Only update displayed date if selection changed externally
        if let sel = selection, uiView.selectedDate != sel {
            uiView.selectedDate = sel
            uiView.displayYear = sel.year
            uiView.displayMonth = sel.month
        }
        uiView.reload()
    }
}

// MARK: - NepaliDatePickerSheet

/// A full-screen modal sheet containing the Nepali date picker.
@available(iOS 14.0, *)
public struct NepaliDatePickerSheet: View {
    @Binding public var isPresented: Bool
    @Binding public var selection: BSDate?
    public var firstDate: BSDate?
    public var lastDate: BSDate?
    public var theme: NepaliDatePickerTheme
    public var lang: String

    public init(
        isPresented: Binding<Bool>,
        selection: Binding<BSDate?>,
        firstDate: BSDate? = nil,
        lastDate: BSDate? = nil,
        theme: NepaliDatePickerTheme = .defaultTheme,
        lang: String = "ne"
    ) {
        self._isPresented = isPresented
        self._selection = selection
        self.firstDate = firstDate
        self.lastDate = lastDate
        self.theme = theme
        self.lang = lang
    }

    public var body: some View {
        NavigationView {
            VStack {
                NepaliDatePickerRepresentable(
                    selection: $selection,
                    firstDate: firstDate,
                    lastDate: lastDate,
                    theme: theme,
                    lang: lang
                )
                .frame(maxWidth: .infinity)
                .frame(height: 340)
                .padding(.horizontal, 16)
                .padding(.top, 16)

                if let sel = selection {
                    Text(sel.description)
                        .font(.headline)
                        .padding(.top, 8)
                }

                Spacer()
            }
            .navigationTitle(lang == "ne" ? "मिति छान्नुहोस्" : "Select Date")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button(lang == "ne" ? "ठीक छ" : "Done") {
                        isPresented = false
                    }
                    .fontWeight(.semibold)
                }
                ToolbarItem(placement: .navigationBarLeading) {
                    Button(lang == "ne" ? "रद्द" : "Cancel") {
                        isPresented = false
                    }
                }
            }
        }
    }
}

// MARK: - View Extension

@available(iOS 14.0, *)
public extension View {
    /// Attaches a Nepali date picker sheet that presents when `isPresented` is `true`.
    ///
    /// Usage:
    /// ```swift
    /// @State private var showPicker = false
    /// @State private var selectedDate: BSDate? = nil
    ///
    /// someView
    ///     .nepaliDatePicker(isPresented: $showPicker, selection: $selectedDate)
    /// ```
    func nepaliDatePicker(
        isPresented: Binding<Bool>,
        selection: Binding<BSDate?>,
        firstDate: BSDate? = nil,
        lastDate: BSDate? = nil,
        theme: NepaliDatePickerTheme = .defaultTheme,
        lang: String = "ne"
    ) -> some View {
        self.sheet(isPresented: isPresented) {
            NepaliDatePickerSheet(
                isPresented: isPresented,
                selection: selection,
                firstDate: firstDate,
                lastDate: lastDate,
                theme: theme,
                lang: lang
            )
        }
    }
}
